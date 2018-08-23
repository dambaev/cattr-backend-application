<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * Class ProjectsUsers
 * @package App\Models
 *
 * @property int    $project_id
 * @property int    $user_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property User $users
 * @property Rule $Project
 */
class ProjectsUsers extends Model
{
    /**
     * table name from database
     * @var string
     */
    protected $table = 'projects_users';

    protected function setKeysForSaveQuery(Builder $query)
    {
        $query
            ->where('project_id', '=', $this->getAttribute('project_id'))
            ->where('user_id', '=', $this->getAttribute('user_id'));
        return $query;
    }

    /**
     * @var array
     */
    protected $fillable = ['project_id','user_id'];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}