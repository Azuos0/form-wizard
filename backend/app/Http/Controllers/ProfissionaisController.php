<?php

namespace App\Http\Controllers;

use App\Profissionais;
use Illuminate\Http\Request;

class ProfissionaisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Profissionais::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|min:1',
            'profissao' => 'required|string|min:1'
        ]);

        $profissional = Profissionais::create($data);

        return response($profissional, 201);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profissionais  $profissionais
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profissionais $profissional)
    {
        $data = $request->validate([
            'nome' => 'required|string|min:1',
            'profissao' => 'required|string|min:1'
        ]);

        $profissional->update($data);

        return response($profissional, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profissionais  $profissionais
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profissionais $profissional)
    {
        $profissional->delete();

        return response("Profissional excluído com sucesso", 200);
    }
}
