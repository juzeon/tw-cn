import React from "react"
import {Box, Button, ButtonGroup, Grid, Typography} from "@material-ui/core"

export class OptionSelector extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Box my={1} style={{position:"relative",margin:'10px 0'}}>
                <Typography display={"inline"} variant={"body1"}>{this.props.description}</Typography>
                <ButtonGroup variant={"outlined"} color={"primary"}>
                    {this.props.options.map((value,index)=>{
                        let variant=(index==this.props.index)?'contained':'outlined'
                        return (<Button onClick={()=>this.props.onChange(index)} variant={variant}>{value}</Button>)
                    })}
                </ButtonGroup>
            </Box>
        )
    }
}
