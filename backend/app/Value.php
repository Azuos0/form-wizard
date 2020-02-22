<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    /**
     * Get the post that owns the comment.
     */
    public function inputs(){
        return $this->belongsTo('App\Input', 'input_id', 'id');
    }
      
}
