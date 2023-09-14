# The New and Improved THT Website
This is the new THT Website built with Next.js and Supabase!

## Authors
Made by THT Web Committee
1. Hariharan Chidambaram
2. Kate McGraw
3. Mihika Thakurta
4. Geroge Gilfond
5. Aryan Thomare
6. Lily Collins
7. Shu Adhya
8. Owen Willouhby

# Domain
1. Currently deployed @ https://melodic-smakager-952e84.netlify.app
2. Used Netlify to connect my personal github (HariChidam) to to THT Organization and deploys through mine.

# How to get set up
1. First make sure you have Node.js installed. You can check by doing `node -v`. If you have an old version just update to the most modern version
2. Next check to see if you have npm installed. You can check by doing `npm -v`. If you have an old version just update to the most modern version
3. Next clone the repository onto your own machine. `git clone [url]`
4. Next `cd` into the directory and install all the dependencies. You can do that by doing `npm install`
5. Now you need to make sure you have been invited to Supabase Project. (Ask Hari for invite)
6. Lastly for set up you need the `.env` file. This file is not of Github and is where we keep our API keys. Get this file from any of the Authors and place it into your root directory and name it `.env`
7. Now if you try `npm run dev` you should be able to navigate to http://localhost:3000/ and see the webiste running on your local machine!
8. If you see the site then you are ready to start deving!!

# How to contribute
To make changes please follow this process
1. You will first start on the main branch. To check what branch you are on `git branch`.
2. Then before you make any changes `git pull`
3. Now to start making changes please create a new branch `git checkout -b [FEATURE_NAME]`
4. When you finish a part of your feature and wish to push the changes to the remote repository:
5. `git add [changed_files]` (replace changed_files with the actual file names you changed)
6. `git commit -m "meaningful commit message goes here"`
7. `git push --set-upstream origin [FEATURE_NAME]` (the next time you push to this branch you can just say `git push`).
8. Once it is ready to be merged go to Github and open a Pull Request.
9. Then tell Hari and he will check it and merge it to main
10. Your feature branch is then deleted so follow this process and make a new branch again next time
11. Anything merged to main is automatically built and deployed!
