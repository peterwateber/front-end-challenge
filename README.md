# Project URL

https://peter-busbud-coding-challenge.herokuapp.com

# Run test

`npm t`

# File Structure

```
common/
	components/
		card/
		layout/
		search/
	icons-svg/
		bus/
pages/
utilities/
```

# File Naming and Standards

Using kebab case for all components, tests, and directories

#### Folders

```
icons-svg/
```

#### Files

##### Javascript: `page.tsx` `sample-page.tsx` `sample-page.test.tsx`

##### CSS: `content.module.scss` `page.module.css`

##### Tests: `mytest.test.tsx` `myothertest.test.ts`

#### Variables

-   Javascript
    `const myVariable`
    `class MyClass`

-   [CSS/SCSS modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)

    -   `content.module.scss`
    -   `page.module.css`
    -   Naming (CLASS and ID)
        -   `.my-class-name { }` - `#idName`

# Convention

Each folder contains `index.tsx` which is the first entry point. Relative to the directory are files that are chopped for reusability purposes.

#### Example: Card component

Structured below:

```
common/
	components/
		card/
			__tests__/
			widgets/
			card.module.scss
			compressed.tsx
			uncompressed.tsx
			index.tsx
```

`Card component` have two views:

1. Uncompressed
    - Full width block cards used as the default view.
    - Displays: - Origin and destination cities - Detail toggle: - Detail views for amenities and terms
2. Compressed
    - Full width blocks cards used for combining common operators
    - Displays: - Price range [min] - [max]
    - Detail toggle: - List of trips available - Detail views for origin and destination cities - Detail views for amenities and terms

#### Pages

Since we only have one page, `index.tsx`, no need to categorise.

```
	__tests__
	index.tsx
```

If we have different pages, then we can do so by following the format:

```
	pages/
		__tests__
		home/
			__tests__/
			index.tsx
		about-us/
			__tests__/
			index.tsx
		...
```

#### Utilities

Generally used for logic stuff.

```
	utilities/
		factory/
			__tests__/
		types/
		transform/
```
