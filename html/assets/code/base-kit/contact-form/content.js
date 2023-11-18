document.write( // Copy froom contents.html until we find a way to fetch this instead.
`
<style type="text/css" scoped>@import url(/assets/code/base-kit/contact-form/content.css);</style>
<section id="contact-me-section" class="follower hidden blackout">
    <div class="rounded shadow bordered vertically-centered horisontally-centered box" id="forum-container">
        <button class="rounded shadow bordered" id="contact-me-close-button">x</button>
        <form id="contact-me-forum" method="POST">
            <div id="contact-me-forum-email">
                <label 
                    for="contact-me-forum-email-input"
                    class="horisontally-centered"
                    id="contact-me-forum-email-label"
                >Email adress</label>
                <input 
                    autocomplete="email"
                    name="email" 
                    class="horisontally-centered rounded"
                    id="contact-me-forum-email-input" 
                    type="email" 
                    placeholder="example@domain.com"
                    required>
            </div>
            <div id="contact-me-forum-subject">
                <label 
                    for="contact-me-forum-subject-input"
                    class="horisontally-centered"
                    id="contact-me-forum-subject-label"
                >Subject</label>
                <input 
                    name="subject" 
                    class="horisontally-centered rounded"
                    id="contact-me-forum-subject-input" 
                    type="text" 
                    placeholder="Reaching out"
                    required>
            </div>
            <div id="contact-me-forum-message">
                <label 
                    for="contact-me-forum-message-input" 
                    class="horisontally-centered"
                    id="contact-me-forum-message-label"
                >Message</label>
                <textarea 
                    name="message" 
                    class="not-resizable horisontally-centered rounded"
                    id="contact-me-forum-message-input" 
                    placeholder="This is still a work in progress and it does not work yet."
                    required
                ></textarea>
            </div>
            <input 
                type="submit" 
                value="Sent" 
                id="contact-me-forum-submit-button"
                class="rounded shadow bordered horisontally-centered">
        </form>
    </div>
    <script type="module" src="/assets/code/base-kit/contact-form/module.js"></script>
    <script type="module">
        const id = "contact-me-close-button"
        import { showContactMeForm } from '/assets/code/base-kit/contact-form/module.js';
        const button = document.getElementById(id);
        button.addEventListener('click', showContactMeForm);
    </script>
</section>
`);