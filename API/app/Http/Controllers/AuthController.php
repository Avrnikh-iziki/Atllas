<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' =>  'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Bad creds',
                'token' => false
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($response, 201);
    }

    public function logout(Request $request) {
         $res =  auth()->user()->tokens()->delete();
         $res=[
            'message'=>'logged out'
         ];
         return response()->json($res,200);
    }

    public function deletUser(Request $request )
    {
        $confirm = $request->header('X-confirm');
        $userid = auth()->user()->id;

        $delet =  intval($confirm)
            ? User::destroy($userid)
            : 0;
        $deletproduct = ($delet) 
            ? Project::where('fkey', $userid)->delete()
            : 0;

        $res = ($deletproduct) 
            ? response()->json("user deleted",200)
            : response()->json("please confirm your deletion",203);
        return $res;


      

        return response()->json($userid,200);
    }

   
}