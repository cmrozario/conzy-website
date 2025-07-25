<script>
  export let title;
  export let date;
  export let content;
  export let images = [];
</script>

<article class="entry-card">
  <h2>{title}</h2>
  <small class="date">{date}</small>
  
  <div class="content">
    {@html content}
  </div>

  {#if images.length}
    <div class="image-gallery">
      {#each images as img}
        <img src={`images/${img}`} alt={title} />
      {/each}
    </div>
  {/if}
</article>

<style>
.entry-card {
  display: block;       /* ✅ Ensures vertical stacking */
  width: 85%;          /* ✅ Forces full width of parent */
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem 2rem;
  font-family: 'Arial', sans-serif;
}



  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .date {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 1.5rem;
    display: block;
  }

  .content {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #444;
    margin-bottom: 1.5rem;
  }

  .content aside {
    background-color: #f0f8ff;
    border-left: 4px solid #0077cc;
    padding: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #333;
    border-radius: 6px;
  }

  .image-gallery {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .image-gallery::-webkit-scrollbar {
    display: none;
  }

  .image-gallery {
    scrollbar-width: none; /* Firefox */
  }

  .image-gallery img {
    flex: 0 0 auto;
    width: 300px;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.3s ease;
    scroll-snap-align: start;
  }

  .image-gallery img:hover {
    transform: scale(1.05);
  }
  .image-gallery {
  max-width: 70%;
}

  @media (max-width: 768px) {
    .entry-card {
      padding: 1rem;
    }

    h2 {
      font-size: 2rem;
    }

    .content {
      font-size: 1rem;
    }

    .image-gallery img {
      width: 240px;
    }
  }
</style>
