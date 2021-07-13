import React from "react"
import {Button, ButtonGroup} from "@material-ui/core"
export class ButtonLine extends React.Component{
    constructor(props) {
        super(props)
    }
    handleTransBtn(){
        this.props.onTrans()
    }
    handleCopyBtn(){
        this.props.onCopy()
    }
    handlePasteBtn(){
        this.props.onPaste()
    }
    render() {
        return (
            <ButtonGroup variant={"contained"} fullWidth={true}>
                <Button onClick={this.handleTransBtn.bind(this)}>转换</Button>
                <Button onClick={this.handleCopyBtn.bind(this)}>复制</Button>
                <Button onClick={this.handlePasteBtn.bind(this)}>贴上</Button>
            </ButtonGroup>
        )
    }
}
