import {test, expect, describe, beforeEach, afterEach}from "@playwright/test";
import helper from "./helper.js";

describe('Test bloglist app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/test/reset');
       const res =  await request.post('/api/users', {
            data: {
                username: 'testuser',
                password: 'testpassword',
                name: 'testname'
            }
        });
        console.log(res.status())
        console.log(await res.text())

        await page.goto('/');
    });

    test('front page can be opened', async ({ page }) => {
        await expect(page.getByText('BlogList')).toBeVisible();
    });

    test('user can login', async ({ page }) => {
        await helper.loginWith(page, 'testuser', 'testpassword');
        await expect(page.getByText(/testuser logged in/i)).toBeVisible();
        
    });

    test('login fails with wrong password', async ({ page }) => {
        await helper.loginWith(page, 'testuser', 'wrongpassword');
        console.log(await page.content())
        await expect(page.locator('.notification')).toContainText(/Wrong username or password/i, {timeout: 4000})
    });

    describe('when user is logged in', () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, 'testuser', 'testpassword');
        });

        test('user can create a blog', async ({ page }) => {
            const newblog = {
                title: 'my title',
                author: 'my author',
                url: 'my url'
            };
            await helper.createAblog(page, newblog);
            await expect(page.getByText('my title')).toBeVisible();
        });

        test('created blog appears with correct author', async ({ page }) => {
            const newblog = {
                title: 'another title',
                author: 'another author',
                url: 'another url'
            };
            await helper.createAblog(page, newblog);
            await expect(page.getByText('another title')).toBeVisible();
            await expect(page.getByText('another author')).toBeVisible();
        });

        test('user can like a blog', async ({ page }) => {
            const newblog = {
                title: 'likeable blog',
                author: 'author',
                url: 'url'
            };
            await helper.createAblog(page, newblog);
            const blog = page.locator('div', {hasText: newblog.title});
            await blog.getByRole('button', {name: 'show'}).click();
            await blog.getByRole('button', { name: 'like' }).click();
            await expect(blog.getByText('Likes: 1')).toBeVisible();
        });

        test('user can delete their own blog', async ({ page }) => {
            const newblog = {
                title: 'deletable blog',
                author: 'author',
                url: 'url'
            };
            await helper.createAblog(page, newblog);
            const blog = page.locator('div', {hasText: newblog.title});
            await blog.getByRole('button', {name: 'show'}).click()
            page.once('dialog', dialog => dialog.accept());
            await blog.getByRole('button', { name: 'remove' }).click();
       
            await expect(blog.getByText('deletable blog')).not.toBeVisible();
        });

        test('blogs are arranged in the order of their likes', async ({page}) => {
            const blog1 = {
                title: 'hello world',
                author: 'rabin',
                url: 'www.google.com'
            }
            const blog2 = {
                title: 'second blog',
                author: 'alice',
                url: 'www.example.com'
            }
            const blog3 = {
                title: 'third blog',
                author: 'bob',
                url: 'www.test.com'
            }
            const blog4 = {
                title: 'fourth blog',
                author: 'eve',
                url: 'www.site.com'
            }
            await helper.createAblog(page,blog1)
            await helper.createAblog(page, blog2)
            await helper.createAblog(page,blog3)
            await helper.createAblog(page,blog4)
            
            const normalize = title => title.replace(/\s+/g, '-').toLowerCase();

            const blog1locator = page.getByTestId(`blog-${normalize(blog1.title)}`);
            const blog2locator = page.getByTestId(`blog-${normalize(blog2.title)}`);
            const blog3locator = page.getByTestId(`blog-${normalize(blog3.title)}`);
            const blog4locator = page.getByTestId(`blog-${normalize(blog4.title)}`);

            await blog1locator.getByRole('button', {name: 'show'}).click();
            await blog2locator.getByRole('button', {name: 'show'}).click();
            await blog3locator.getByRole('button', {name: 'show'}).click();
            await blog4locator.getByRole('button', {name: 'show'}).click();

            // Helper function to click the like button multiple times
            const likeBlog = async (blogLocator, times) => {
                for (let i = 0; i < times; i++) {
                    await blogLocator.getByRole('button', { name: 'like' }).click();
                }
            }

            // Example: like blog1 3 times
            await likeBlog(blog1locator, 3);
            await likeBlog(blog2locator, 5);
            await likeBlog(blog3locator, 2);
            await likeBlog(blog4locator, 4);

            // Get all blog elements after liking
            const blogElements = await page.locator('.blog').all();


            // Extract likes from each blog element
            const likesArray = [];
            for (const blog of blogElements) {
                // Expand blog details if needed
                const showButton = blog.getByRole('button', {name: 'show'})

                if( await showButton.isVisible()){
                    await showButton.click()
                }
                const likesText = await blog.getByText(/Likes:/).textContent();
                const likes = parseInt(likesText.match(/Likes:\s*(\d+)/)[1], 10);
                likesArray.push(likes);
            }

            // Check if likes are sorted in descending order
            for (let i = 0; i < likesArray.length - 1; i++) {
                expect(likesArray[i]).toBeGreaterThanOrEqual(likesArray[i + 1]);
            }
        })

        
    });

    afterEach( async ({request}) => {
        await request.post('/api/test/reset');
    })
});