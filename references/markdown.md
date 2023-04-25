<!-- # Helpers -->

---

## Styles

_Italic_

**Bold**

**_Bold And Italic_**

---

## Blockquotes

> Dorothy followed her through many of the beautiful rooms in her castle.

> Dorothy followed her through many of the beautiful rooms in her castle.

> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with

> **_The quarterly results look great!_**
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.

---

## Lists

Ordered list

1. First item
2. Second item
3. Third item
   1. Indented item
   2. Indented item
4. Fourth item

Unordered list

- First item
- Second item
- Third item
  - Indented item
  - Indented item
- Fourth item

Starting with numbers

1. First item
2. Second item
3. 1968\. A great year!

---

## Images

![Alternate text](/images/not-exists-image.webp)

![Alternate text](/images/on-table.webp)

---

## Horizontal rules

To create a horizontal rule, use three or more asterisks (\*\*\*), dashes (---), or underscores (\_\_\_) on a line by themselves.

---

...and after a horizontal rule.

---

## Links

- My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

- My favorite search engine is [Duck Duck Go](https://duckduckgo.com 'The best search engine for privacy').

- I love supporting the **[EFF](https://eff.org)**.
  This is the _[Markdown Guide](https://www.markdownguide.org)_.
  See the section on [`code`](#code).

---

## Example Putting the Parts Together

Say you add a URL as a standard URL link to a paragraph and it looks like this in Markdown:

In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'), and that means comfort.
Though it may point to interesting additional information, the URL as displayed really doesn’t add much to the existing raw text other than making it harder to read. To fix that, you could format the URL like this instead:

In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'

In both instances above, the rendered output would be identical:

In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.

and the HTML for the link would be:

<a href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">hobbit-hole</a>
