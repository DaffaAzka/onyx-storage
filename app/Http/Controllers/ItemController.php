<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Auth;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $query = Item::with(['category', 'user'])->latest();

        if ($request->has('search') && $request->search) {
            $query = $query->where('name', 'like', '%' . $request->search . '%')->orWhere('code', 'like', '%' . $request->search . '%')->orWhere('description', 'like', '%' . $request->search . '%');
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
            'image_url' => 'nullable|url',
            'status' => 'required|string',
            'quantity' => 'required|integer|min:0',
            'evailable_quantity' => 'required|integer|min:0',
            'code' => 'required|string|unique:items,code',
        ]);

        $request['user_id'] = Auth::user()->id;

        Item::create($request->all());
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
