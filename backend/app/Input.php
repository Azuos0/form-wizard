<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Input extends Model
{
    /**
     * Get the post that owns the comment.
     */
    public function form()
    {
        return $this->belongsTo('App\Form', 'form_id', 'id');
    }

    public function values(){
        return $this->hasMany('App\Value', 'input_id', 'id');
    }
}
