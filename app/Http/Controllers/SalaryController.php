<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query("user_name");
        $pagination = Salary::whereHas("user", function ($query) use ($name) { // phpcs:ignore
            $query->where("name", "like", "%{$name}%");
        })
            ->with("user")
            ->orderBy("created_at", "desc")
            ->paginate(10)
            ->withQueryString();

        return Inertia::render("Salaries/index", [
            "pagination" => $pagination,
        ]);
    }

    public function show(int $id)
    {
        $salary = Salary::with("user")->findOrFail($id);
        return Inertia::render("Salaries/show", [
            "salary" => $salary,
        ]);
    }

    public function create()
    {
        return Inertia::render("Salaries/create");
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                "username" => ["required", "exists:users,username"],
                "amount" => ["required", "numeric"],
                "bonus" => ["required", "numeric"],
            ]);

            $user = User::where("username", $request->username)->firstOrFail();
            $request->merge(["user_id" => $user->id]);
            $salary = new Salary();
            $salary->fill($request->all());
            $salary->save();

            return redirect()->route("salaries.index");
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                "username" => ["required", "exists:users,username"],
                "amount" => ["required", "numeric"],
                "bonus" => ["required", "numeric"],
            ]);

            $user = User::where("username", $request->username)->firstOrFail();
            $request->merge(["user_id" => $user->id]);
            $salary = Salary::findOrFail($id);
            $salary->fill($request->all());
            $salary->save();

            return redirect()->route("salaries.index");
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        try {
            $salary = Salary::findOrFail($id);
            $salary->delete();
            return redirect()->route("salaries.index");
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

}
