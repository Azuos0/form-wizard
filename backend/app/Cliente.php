<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = ['nome', 'sexo'];
    protected $hidden = ['created_at', 'updated_at'];

    public $timestamps = false;
}
