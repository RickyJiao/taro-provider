# taro-provider

React use cache is an local cache manager to cache response data in memory. It will automatically return previous cached one when requesting the same data from serve to:
- improve performance
- avoid multiple same requests to server to reduce server pressure

## Installation

Using npm:

```sh
$ npm install --save taro-provider
```

Using yarn:

```sh
$ yarn add taro-provider
```

## Example

### createProvider
React hook for cache promises fulfill value. Use with `fetch` or `axiso` together to avoid multiple same request to server. Here is an example to cache blog detail object.

Once a new comment is created, we are able to use `updateCache` to update the cached object.

```jsx
// Blog.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useCache } from 'taro-provider';

export default function Blog() {
  const { id: blogId } = useParams();
  const { isFetching, data: blog, updateCache } = useCache(
    () => axios.get(`/blog/${blogId}`),
    `BLOG_${blogId}`
  );
  const [comment, setComment] = useState<string>('');

  async function addComment() {
    const addedComment = await axios.post(`/blog/${blogId}/comment`, {
      comment: comment,
    });

    const newComments = [...(blog.comments || []), addedComment];

    updateCache({
      ...blog,
      comments: newComments,
    });
  }

  return (
    <div>
      {isFetching && <span>Loading...</span>}
      {blog && (
        <div>
          <div>...render blog content here</div>
          <div>...render comment list</div>
        </div>
      )}
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button onClick={addComment}>Add comment</button>
      </div>
    </div>
  );
}
```


## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
