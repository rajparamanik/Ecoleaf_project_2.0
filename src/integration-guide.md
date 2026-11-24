# How to Integrate Authentication and Social Features

This guide explains how to integrate the authentication system, comments, likes, and sharing features into your existing EcoLife website.

## Authentication Integration

1. Add AuthProvider to your main app entry point:

```jsx
// In your main.tsx or App.tsx
import { AuthProvider } from './components/Auth/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  </StrictMode>
);
```

2. Replace the current login button with UserMenu component:

```jsx
// In your navigation bar
import UserMenu from './components/Auth/UserMenu';

// Replace this:
<a class="login-page" onclick=loginpage() href="#"><image src="/user-account-icon-for-your-design-only-free-png.webp" style="width: 20px;position: relative; top: 2px;"></image>Log/Sign</a>

// With this:
<UserMenu />
```

## Adding Social Features to Tree Pages

For each tree detail page (sections with class names like mangoclick, mangoclick2, etc.), add the TreePageEnhancer component:

```jsx
// For each tree page (e.g., in the mangoclick section)
import TreePageEnhancer from './components/Integration/TreePageEnhancer';

// At the bottom of your tree information page:
<TreePageEnhancer 
  treeId="mango-1" 
  treeName="Mango (Mangifera indica)" 
  description="Mango is a large, evergreen tropical tree known for its sweet, juicy fruit."
/>
```

## Manual Integration for HTML-only Pages

If you're working with HTML-only pages (without React components), add the following HTML structure at the bottom of each tree information page, just before the closing `</pre>` tag:

```html
<div class="comment-section">
  <h4>Comments</h4>
  <textarea placeholder="Write a comment..." class="comment-input"></textarea>
  <button class="comment-btn">Post</button>
  <div class="comment-list"></div>
</div>
```

Then add the following script to your page to initialize the comment functionality:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const commentBtn = document.querySelector('.comment-btn');
    const commentInput = document.querySelector('.comment-input');
    const commentList = document.querySelector('.comment-list');

    // Add event listener to post button
    commentBtn.addEventListener('click', function() {
      const commentText = commentInput.value.trim();
      if (commentText) {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('ecolife_user') || 'null');
        if (!user) {
          // Prompt to login
          loginpage();
          return;
        }

        // Add comment to list
        const comment = document.createElement('div');
        comment.className = 'comment-item';
        comment.innerHTML = `
          <strong>${user.username}</strong>
          <p>${commentText}</p>
          <small>Just now</small>
        `;
        commentList.prepend(comment);
        commentInput.value = '';
      }
    });
  });
</script>
```

## Testing Your Implementation

After integrating these components, you should be able to:

1. Register a new account or log in with an existing one
2. Post comments on tree information pages
3. Like/unlike tree information
4. Share the content on social media

For any issues or questions, please refer to the component documentation in each file.