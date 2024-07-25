<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->load('roles', 'employee', 'employee.department');
        }

        $flash = [
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'info' => $request->session()->get('info'),
            'warning' => $request->session()->get('warning'),
        ];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'flash' => $flash,
        ];
    }
}
