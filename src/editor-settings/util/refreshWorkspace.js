export default function (ScratchBlocks) {
    let workspace = ScratchBlocks.getMainWorkspace();
    let vm = window.vm;

    if (workspace && vm && vm.editingTarget) {
        const eventsOriginallyEnabled = ScratchBlocks.Events.isEnabled();
        ScratchBlocks.Events.disable();

        vm.emitWorkspaceUpdate();

        const flyout = workspace.getFlyout();
        if (flyout) {
            const flyoutWorkspace = flyout.getWorkspace();
            window.Blockly.Xml.clearWorkspaceAndLoadFromXml(
                window.Blockly.Xml.workspaceToDom(flyoutWorkspace),
                flyoutWorkspace
            );
        }
        workspace.getToolbox().refreshSelection();
        workspace.toolboxRefreshEnabled_ = true;

        if (eventsOriginallyEnabled) ScratchBlocks.Events.enable();
    }
}