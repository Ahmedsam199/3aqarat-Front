function registerEmojiButton(editor, toolbarId, onAction, tooltipText) {
  editor.ui.registry.addButton("liaEmoji", {
    icon: "emoji",
    tooltip: "Emoji picker",
    onAction: () => {
      const emojiButton = document.querySelector(
        `#${toolbarId} [aria-label='${tooltipText}']`
      );

      onAction(emojiButton);
    }
  });
}

export default function registerEmoji(
  editor,
  toolbarId,
  onAction,
  tooltipText
) {
  registerEmojiButton(editor, toolbarId, onAction, tooltipText);
}
