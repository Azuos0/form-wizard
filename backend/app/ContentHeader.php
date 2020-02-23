<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContentHeader extends Model
{
    public function form()
    {
        return $this->belongsTo('App\Form', 'form_id', 'id');
    }
}
