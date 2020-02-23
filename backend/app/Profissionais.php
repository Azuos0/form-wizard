<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profissionais extends Model
{
    protected $fillable = ['nome', 'profissao'];

    public $timestamps = false;
}
