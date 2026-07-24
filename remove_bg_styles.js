const fs = require('fs');
const sections = [
    'PhotoGallerySection', 'VideoRevealSection', 'LifeJourneySection',
    'FriendshipTimelineSection', 'BeforeAfterSection', 'ReasonsWallSection',
    'StarRatingSection', 'QuizSection', 'WishesSection', 'TimeCapsuleSection',
    'RandomSurpriseSection', 'GuestbookSection', 'ClosingSection'
];

sections.forEach(name => {
    const path = 'src/components/sections/' + name + '.tsx';
    let c = fs.readFileSync(path, 'utf8');
    let changed = false;

    // Add Iridescence import if not present
    if (!c.includes('Iridescence')) {
        c = c.replace(/(["']use client["'];\s*\r?\n)/m, '$1\nimport Iridescence from "@/components/ui/Iridescence";\n');
        changed = true;
    }

    // Remove inline background style from section tag (single-line style)
    const before = c;
    c = c.replace(/(id="section-[^"]*"[^>]*?)\s*style=\{(\{[^}]*background:[^}]*\})\}([^>]*>)/g, '$1$3');
    if (c !== before) changed = true;

    if (changed) {
        fs.writeFileSync(path, c);
        console.log('Updated: ' + name);
    } else {
        console.log('Skipped (no changes needed): ' + name);
    }
});
