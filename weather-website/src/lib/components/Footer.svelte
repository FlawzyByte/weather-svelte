<script lang="ts">
  export let githubUrl: string;
</script>

<footer class="footer">
  <div class="container mx-auto py-6 px-4 flex justify-between items-center">
    <div class="flex space-x-4">
      <a href="/about" class="footer-link" aria-label="About Us">About</a>
      <a href="/contact" class="footer-link" aria-label="Contact Us">Contact</a>
    </div>
    <div class="flex items-center space-x-4">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="GitHub Account">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.868 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.087.637-1.338-2.221-.252-4.555-1.11-4.555-4.942 0-1.091.39-1.985 1.029-2.683-.103-.253-.446-1.271.098-2.646 0 0 .84-.269 2.75 1.024A9.557 9.557 0 0112 6.802c.85.004 1.705.115 2.505.337 1.908-1.293 2.746-1.024 2.746-1.024.546 1.375.203 2.393.1 2.646.64.698 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.745 0 .268.18.579.688.481C19.134 20.163 22 16.418 22 12c0-5.52-4.48-10-10-10z"
          />
        </svg>
      </a>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: #f3f4f6;
    border-top: 1px solid #e5e7eb;
  }
  .footer-link {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
  }
  .footer-link:hover {
    color: #1f2937;
  }
</style>