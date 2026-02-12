<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Item::with(['category', 'user'])->latest();

        if ($request->has('search') && $request->search) {
            $query = $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('code', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        $items = $query->paginate(10);

        $categories = Category::all();

        return inertia('modules/items/items', [
            'items' => $items,
            'filters' => $request->only(['search']),
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|unique:items,name',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string',
            'quantity' => 'required|integer|min:0',
            'evailable_quantity' => 'required|integer|min:0|lte:quantity',
            'code' => 'required|string|unique:items,code',
        ]);

        $data = $request->all();
        $request['user_id'] = Auth::user()->id;
        $data['user_id'] = Auth::user()->id;

        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
            $path = $file->store('items', 'public');
            $data['image_path'] = $path;
        }

        Item::create($data);
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|unique:items,name,' . $id,
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string',
            'quantity' => 'required|integer|min:0',
            'evailable_quantity' => 'required|integer|min:0|lte:quantity',
            'code' => 'required|string|unique:items,code,' . $id,
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::user()->id;

        if ($request->hasFile('image_path')) {
            $item = Item::find($id);
            if ($item->image_path) {
                Storage::disk('public')->delete($item->image_path);
            }
            $file = $request->file('image_path');
            $path = $file->store('items', 'public');
            $data['image_path'] = $path;
        }

        Item::where('id', $id)->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $item = Item::find($id);
        if ($item && $item->image_path) {
            \Storage::disk('public')->delete($item->image_path);
        }
        Item::where('id', $id)->delete();
        return back();
    }
}
