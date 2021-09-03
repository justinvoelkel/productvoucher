npm install

npm run serve (serve on port 3000)

npm run test (run test suite)

## Disclaimer
- This project is not meant to be production ready. It's purpose is to give a general outline of how to solve the stated problem. I have tried to note below and in the code where improvements could/would be made for a real life implementation.

- There is no formal database spun up for this. I am using values in memory to simulate interacting with a datastore. I've included some general queries in the db access files for reference.

## Assumptions
- Vouchers would be created by some other system and linked to products via database tables. This is an ok basic implementation but would be slower at very large scale. Using  a fiestel cipher/network to create an obfuscated and decryptable code would scale efficiently and only used codes would need to be stored. [source](https://bytes.grubhub.com/why-we-use-crypto-when-generating-coupon-codes-at-scale-44dc737a52c9)

- Vouchers can be associated with multiple products so I am assuming an associative table linking the two.

- On the front end - because vouchers can be tied to multiple products I am assuming the page that allows the image upload would allow the user to select which product they wanted. I know the documentation said pre-selected but that would only seem to work if there were only a one-to-one relationship between voucher and product.

- As this is a basic model of a larger system I am assuming a data access layer would also have associated unit tests. I am writing integration tests to prove functionality but a real world app would need unit tests on those lower level modules. I could add mocks for the lower level modules and assert appropriate calls but that would not reflect a realistic integration test.

## Notes
- Things like validity checks would probably be best served as middleware that would fail requests sooner in the lifecycle (IE check if redemption code is valid length/format)

- Given more time it's more approriate to have a data access layer for each model that acts as an interface between the controller and the lower level db access. I'd usually reach for a repository pattern. I have worked with ORMs, and that is certainly an option, but the hard coupling between ORM and database schema can end up making small changes into big ones and for that reason I would tend to lean away from using one.

- I have included both a happy and unhappy paths to cover success and common failure states.
