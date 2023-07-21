<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;


class ProjectController extends Controller
{
  
    public function creatProject(request $request)
    {
        $data=[
            "fkey"=>auth()->user()->id,
            "name"=>$request->name,
            "layer"=>""
        ];
       return Project::create($data);
    }
  
    public function allProject(Request $request , $id)
    {
            $response = Project::where("fkey", $id)->pluck('id','name')->toArray();
            $res=[
                'project'=>$response
            ];
             return response()->json($res, 200);
    }

    public function oneProject(Request $request , $id){
        $res= Project::where('id',$id)->get();        
        return response()->json(json_decode($res,200));
    }

    public function saveProject(Request $request , $id)
    {
        $product = Project::find($id);
        $product->update([
            'layer'=>(!empty($request->obj['layer'])) ? json_encode($request->obj['layer']) :""
        ]);
        return response()->json($request->obj,200);
    }

 
    public function deleteProject( Request $request , $id)
    {
        $confirm = $request->header('X-confirm');
        $delet =  intval($confirm)
                ? Project::destroy($id)
                : 0;

        $res = ($delet) 
                ? response()->json("project deleted",200)
                : response()->json("please confirm your deletion",203);
        return $res;
    }

    
}
