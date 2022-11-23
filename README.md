# Set Maven Goals javascript action

This action returns the desired Maven Goals property according to
our specification. This property is also
exported in the Github Environment as `MVN_GOALS`.
Our specification, in short, is as follows:
- Apps that build and deploy docker images to ACR run jib:build
- Apps that build and deploy JAR packages to GPR run the default `deploy` goal to GPR
- Tests are skipped for tags
- No images or packages are deployed for the default branch

## Inputs

### deploy-to-acr

True if the application deploys docker images to Azure Container Registry using Jib, otherwise false.

### deploy-to-acr

True if the application deploys JARs to Github Package Registry using the default `deploy` goal, otherwise false.

## Outputs

### `maven-goals`

The appropriate `maven-goals` value.
This value is also exported in the Github Environment as `MVN_GOALS`.

## Example usage

```yaml
uses: digipost/set-maven-goals@v1.0
```

## Building this project

Make desired changes in `index.js` (and/or other files). Then run

```
ncc build index.js
```

to generate the dist/index.js file

## Links

- [Great guide for creating JavaScript Actions](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [Vercel NCC on Github](https://github.com/vercel/ncc)
