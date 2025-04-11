<script>
    import { goto } from '$app/navigation';
  </script>
  
  <nav>
    <ul>
      <li><a href="/" on:click|preventDefault={() => goto('/')}>Home</a></li>
      <li><a href="/about" on:click|preventDefault={() => goto('/about')}>About</a></li>
      <li><a href="/weather" on:click|preventDefault={() => goto('/weather')}>Weather</a></li>
    </ul>
  </nav>
  
  <style>
    nav ul {
      list-style: none;
      display: flex;
      gap: 1rem;
    }
  
    nav ul li {
      display: inline;
    }
  
    nav ul li a {
      text-decoration: none;
      color: inherit;
    }
  </style>