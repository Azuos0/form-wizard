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

    public function options(){
        return $this->hasMany('App\Options', 'input_id', 'id');
    }
}
