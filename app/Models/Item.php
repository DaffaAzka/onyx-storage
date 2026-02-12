<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'category_id',
        'user_id',
        'image_path',
        'status',
        'quantity',
        'evailable_quantity',
        'code',
    ];

    protected $appends = ['image_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getImageUrlAttribute()
    {
        if ($this->attributes['image_path']) {
            return '/storage/' . $this->attributes['image_path'];
        }
        return null;
    }
}
