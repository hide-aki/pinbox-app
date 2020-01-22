import React from 'react';

/**
 * Extracts additional file information from a DropEvent
 * @param dropEvent The drop Event
 * @param fileItemIndex Index of file
 *
 * @note This works only in webkit browsers, i.e. Chrome. Additionally, it must be applied while the React event exists
 */
export function getFileEntry(dropEvent: React.DragEvent, fileItemIndex: number): any {
    const item = dropEvent.dataTransfer.items[fileItemIndex];
    return item.webkitGetAsEntry();
}
