<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    
    /**
     * Get the comments for the blog post.
     */
    public function inputs()
    {
        return $this->hasMany('App\Input', 'form_id', 'id');
    }

    public function headers()
    {
        return $this->hasMany('App\ContentHeader', 'form_id', 'id');
    }
}
