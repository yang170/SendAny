<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function text()
    {
        return $this->hasOne(Text::class);
    }
}
