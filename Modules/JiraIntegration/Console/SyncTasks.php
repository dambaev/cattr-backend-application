<?php

namespace Modules\JiraIntegration\Console;

use Illuminate\Console\Command;
use Modules\JiraIntegration\Services\SyncTasks as Service;

class SyncTasks extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'jira:sync-tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronize tasks from Jira for all users, who activate the Jira integration.';

    /**
     * @var Service
     */
    protected $service;

    /**
     * Create a new command instance.
     *
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        parent::__construct();

        $this->service = $service;
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->service->synchronizeAll();
    }
}