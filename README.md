## SafeSpace instructions and SafeSpace Git Controls

Starting the repo:

```
git clone https://github.com/Vannilaknight/MAT200S2.git
cd MAT200S2/
git branch NameOfBranch
git checkout NameOfBranch
```

### By now you should be in your own branch and ready to code.

## Creating a Pull Request
While In your own branch:

```
git add -A
git commit -am 'Infomative comment here'
git push origin NameOfBranch
```
click **'Pull Requests'** on the top. Click **'Create new Pull request'** in the top right. 

Github will take you to a screen with two dropdowns on the top. The dropdown to the right is branch you want to merge into the master. If your code successfully pushed to github, the branch name should be listed in the dropdown. Select your branch and finish adding any final comments and create the pull request.


## Final Steps

With your code now merged into the master you can continue on to your next task. 

```
git checkout master
git pull
git branch NewBranchName
git checkout NewBranchName
```

Don't worry about deleting your branch. The Git Admin will monitor and clean the git repo.

Now that your git is ready, lets go get some coding done!
