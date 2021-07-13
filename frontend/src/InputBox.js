import React from "react"
import {Box, Grid, TextField} from "@material-ui/core"

export class InputBox extends React.Component {
    constructor(props) {
        super(props)
    }
    handleTextChange(event){
        this.props.onTextChange(event.target.value)
    }
    render() {
        return (
            <Box>
                <TextField fullWidth={true}
                           multiline={true}
                           placeholder={'在此输入要转换的文本'}
                           value={this.props.text}
                           onChange={this.handleTextChange.bind(this)}
                />
            </Box>
        )
    }
}
