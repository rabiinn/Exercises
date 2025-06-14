const loginWith = async (page, username, password) => {
  console.log('Clicking login...');
  await page.getByRole('button', { name: 'login' }).click();

  console.log('Filling username...');
  await page.getByPlaceholder('username').fill(username);

  console.log('Filling password...');
  await page.getByPlaceholder('password').fill(password);

  console.log('Clicking Submit...');
  await page.getByRole('button', { name: 'Submit' }).click();
};


const createAblog = async (page, content) => {
    await page.getByRole('button', {name: 'new blog'}).click()
    await page.getByPlaceholder('write title here').fill(content.title)
    await page.getByPlaceholder('write author here').fill(content.author)
    await page.getByPlaceholder('url').fill(content.url)
    await page.getByRole('button', {name: 'create'}).click()
}

export default { loginWith, createAblog}