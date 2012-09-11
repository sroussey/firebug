function runTest()
{
    FBTest.sysout("issue5755.START");
    FBTest.openNewTab(basePath + "html/5755/issue5755.html", function (win)
    {
        FBTest.openFirebug();
        var panel = FBTest.selectPanel("html");
        if (FBTest.ok(panel, "Firebug must be opened and switched to HTML panel now."))
        {
            // to make sure displayedAttributeValueLimit hasn't a value of 0
            FBTest.setPref("displayedAttributeValueLimit", 10);
            var longOnclickValue = win.document.getElementById("long-onclick").
                getAttribute("onclick");
            FBTest.selectElementInHtmlPanel("long-onclick", function (nodes)
            {
                // getting onclick attribute's value
                var onclickValue = nodes.getElementsByClassName("nodeValue").item(1);
                FBTest.synthesizeMouse(onclickValue);
                var texteditor = panel.panelNode.getElementsByClassName("textEditorInner").item(0);
                if (FBTest.ok(texteditor, "Editor must be loaded now."))
                {
                    FBTest.compare(longOnclickValue, texteditor.value,
                        "Inline editor must contain whole string of onclick value.");
                }
                FBTest.testDone("issue5755.DONE");
            });
        }
        else
        {
            FBTest.testDone("issue5755.FAILED");
        }
    });
}