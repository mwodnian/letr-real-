document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const createTextInput = document.getElementById('js-todo-create-text');
    const createButton = document.getElementById('js-todo-create');
    const todoEntries = document.getElementById('js-todo-entries');
    let warningMessage = 'where is my precious';
    let warningCount = 0;

    // Add new quest
    const addQuest = () => {
        const questText = createTextInput.value.trim();
        if (questText === '') {
            warningCount = warningCount + 1;
            if (warningCount > 3) {
                warningMessage = 'my precious... my precious...';
            }
            showNotification(warningMessage, true);
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            ${questText}
            <a class="js-todo-entry-done" href="javascript:void(0);" title="Mark this quest as complete">[ Complete ]</a>
            <a class="js-todo-entry-remove" href="javascript:void(0);" title="Abandon this quest">[ Abandon ]</a>
        `;

        // Add event listeners for the new quest
        const doneLink = li.querySelector('.js-todo-entry-done');
        const removeLink = li.querySelector('.js-todo-entry-remove');

        doneLink.addEventListener('click', () => {
            li.classList.toggle('completed');
            // Add some LOTR-themed completion messages
            if (li.classList.contains('completed')) {
                const messages = [
                    'Quest completed! The ring-bearer would be proud.',
                    'Another victory for Middle-earth!',
                    'Your quest shall be remembered in the songs of the elves.',
                    'The quest is done, but the journey continues...'
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                showNotification(randomMessage);
            }
        });

        removeLink.addEventListener('click', () => {
            li.style.opacity = '0';
            setTimeout(() => {
                li.remove();
                showNotification('Quest abandoned. May you find a new path.');
            }, 300);
        });

        todoEntries.appendChild(li);
        createTextInput.value = '';
        showNotification('New quest added to your journey!');
    };

    // Add quest when clicking the button
    createButton.addEventListener('click', addQuest);

    // Add quest when pressing Enter
    createTextInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addQuest();
        }
    });

    // Notification system
    const showNotification = (text, isWarning = false) => {
        const notification = document.createElement('div');
        notification.className = `notification ${isWarning ? 'warning' : 'success'}`;
        notification.textContent = text;
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    // Add some LOTR-themed quests as examples
    const initialQuests = [
        'Destroy the One Ring',
        'Journey to Rivendell',
        'Find the Ents',
        'Help the people of Rohan'
    ];

    initialQuests.forEach(quest => {
        createTextInput.value = quest;
        addQuest();
    });
}); 