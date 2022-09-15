<img src="./.readme/noroff-light.png" width="160" align="right">

# Semester project 2

To plan, design and build a responsive e-commerce website using the supplied Strapi backend API.

## Strapi API

To start the API change directory to `api` install the npm dependecies and then run `npm run develop`.  **Note:** these commands can take a few minutes to run.

```bash
$ cd api/
> npm install
> npm run develop
```

### User credentials

```bash
email: admin@admin.com
username: admin
password: Pass1234
```

## Brief

You are to build an e-commerce website. You can choose the theme of your website. It should follow the site architect described in level 1 below. 

The API structure has been set up in Strapi and should not be changed for level 1.  You will need to populate content to match your sites design.  You are responsible for deciding the shops purpose, products, branding and design.

It must have a good user experience and a good UI design, following today's trends and design patterns.

Build a front-end with a homepage, product category list page and product detail page. Build admin pages to update and delete products. 

**Important:** Building a checkout and payment system is not a part of the project.

Level 1 is **required**.

Level 2 and 3 are optional. 

## Level 1 Process (Required)

The structure to build everything in level has been created for you, but you must add the content to Strapi that fit for your purpose/branding/design.

### Customer pages

#### Home page

The home page must include:
- A hero banner with an image that is uploaded to Strapi.
- A list of featured products.
    - In Strapi each product must have a featured flag that can be turned on or off. When the flag is on, the product shall be displayed on the homepage.

#### Products list page

The products page must include:
- A list of all products added to Strapi. Each product must display its title, price and image. The product shall link to its products detail page.
- A search text box.  When searching, the products that include the searched text in their title or description shall be listed.

#### Product details page

The product details page must include:
- the product title,
- the product description,
- the product image,
- the product’s price,
- an add to cart button.

#### Cart/Basket page 

The cart/basket page must display a list of all products added to cart.  Load the items that have been added to local storage and display them on the page.

Each product in the cart must display:
- the product title,
- the product’s price,
- a link to the product view page, and optionally display the product image,

After the list of products, display the total price of all the products in the cart.

**Important:** the cart page is not a checkout page. No payments or user details are required to be taken.

### Admin section
The admin section must include the following features.

#### Login/Logout 

Create an admin login form that allows administrator users to login.

- Use localStorage to keep the user logged in.
- When logged in, display a logout button in the layout the logs the user out.
- Logging out should not clear items not related to login from localStorage.

#### Add/edit products

Create form(s) that allow products to be added and edited.  The form must allow the user to toggle whether a product is featured.

##### Product images

For adding/editing product images use either of these 2 methods:

1. Use a file upload field to upload images to Strapi, or
2. Use a text input that allows a URL to be entered. This allows an image from CDN to be used as the product image.

#### Delete existing product

Allow products to be deleted.  Before a product is deleted you must display a confirmation. The product should only be deleted if the user confirms. If the user cancels, the product must not be deleted.

## Level 2

Deploy Strapi and your website to a live server.

1. Deploy Strapi to a live server, using Strapi's deployment guides (https://strapi.io/documentation/v3.x/deployment/heroku.html).
2. Update your website to point to the deployed version of Strapi.
3. Deploy your website to a sub-domain.

## Level 3

Plan, design and build additional features.  Some examples of features to create:

- Project categories and filters
- Customer registration
- Product favourites list

For level 3, you are allowed add to/change the Strapi structure for your additional features.  These changes must be deployed to live Strapi version.

## Rules

- The website must be responsive on all devices.
- It must be built in vanilla JavaScript using ES modules. 
- No JavaScript libraries or frameworks.
- You may choose a CSS framework but your design must override the basic framework styles. Your UI must appear unique and distinguishable from the framework base styles.

## Marking criteria
- All functionality in Level 1 must be implemented.
- The design should be coherent and provide a good user experience.
- All the customer-facing and admin pages must be fully responsive.
Use appropriate names for CSS classes, components and folders.
- All code should be properly formatted and arranged with sensible variable and function names. Use modules (imports/exports) to organise your code.

## Submissions

### Week 1

- Task planning - e.g. Gant chart or Kanban board with todos in appropriate lanes (Trello or Notion). 
- Wireframes.

### Week 2

- XD or Figma prototype.

### Week 5

#### Level 1 (required)
- A link to your GitHub repository.
#### Levek 2
- A link to your live website.
- A link to your Strapi installation.
- Username and password to access Strapi.
#### Level 3
- Details of additional features.

## Time 

5 Weeks

> Deadline: 11 December 2020 at 23:59.

