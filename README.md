# Scandiweb Junior React Developer Test

Made in correspondance to [these requirements](https://www.notion.so/Entry-React-developer-TEST-39f601f8aa3f48ac88c4a8fefda304c1) for the assesment of the "Junior React Developer" position at Scandiweb.


## First Revision

An `x` indicates it has been done, some points contain personal comments.

- [x] Currency Switcher items don't highlight on hover.

- [x] The product brand is missing on PLP.

- [x] The product brand is missing on Cart Overlay.

  > _Points 1. through 3. have been added. Didn't quite catch that there were brand names in the design file._

- [x] Cart item image arrows are missing on the Cart page.

  > _Added `ArrowThumbnail` component for the Cart page._

- [x] Image thumbnails on PDP don't switch the big image.

  > _Added `ProductGallery` component for the PDP page._

- [x] The cart item total quantity badge on the cart icon should display the total cart item quantity, not the cart item count.

  > _Was unsure about this, but now it displays correctly._

- [x] Cart Overlay doesn't fit the screen when there are too many products.

  > _Not sure which way I am supposed to fix this, I decided to just let it expand the page without adding an overflow scroll on the overlay itself._

- [x] You are fetching the same data twice on PLP. Please don't fetch all products for all categories on PLP. Filter products by category using the graphql query.

  > _Now it fetches the data only for the current category._

- [x] Please examine your network requests in the DevTools. You are fetching product data twice on PDP.

  > _Fixed it by setting initial data (`categoryNames` & `currencies`) to always be loading until it's fetched._

- [x] Please don't fetch the product list of categories on PDP.

  > _Was unsure what this meant, but the `category` field has been removed from the product query and the only product list fetched is the one of the current category on PLP._


## Screenshots

![PLP page image](./.image/plp.png?raw=true "PLP page")

![PDP page image](./.image/pdp.png?raw=true "PDP page")

![Cart overlay image](./.image/cart-overlay.png?raw=true "Cart overlay page")

![Cart page image](./.image/cart.png?raw=true "Cart page")

## Running

To run the project, use the command:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
