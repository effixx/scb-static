from fabric.api import env, run, local, put, cd

env.project_name = 'scb_static'
env.hosts = ['scb-static.firebelly.co']
env.user = 'firebelly'

env.path = '/home/%s/webapps/%s' % (env.user, env.project_name)
env.stage = 'staging'
env.git_branch = 'master'

def deploy():
    update()

def update():
    with cd(env.path):
        run('git pull origin %s' % env.git_branch)
