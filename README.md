# Set Revision javascript action

This action uses the github reference of the caller context,
and returns the desired Maven Revision property according to
our specification. This property is also
exported in the Github Environment as `REVISION`.
Our specification, in short, is as follows:
- Tags remain unchained
- Default branches are renamed to `latest`
- Non-default branches are appended with a `-SNAPSHOT` suffix

## Inputs

### deploy-to-acr

True if the application deploys docker images to Azure Container Registry using Jib, otherwise false.

### deploy-to-acr

True if the application deploys JARs to Github Package Registry, otherwise false.

## Outputs

### `revision`

The appropriate `revision` value.
This value is also exported in the Github Environment as `REVISION`.

## Example usage

```yaml
uses: digipost/set-revision@v0.7
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
