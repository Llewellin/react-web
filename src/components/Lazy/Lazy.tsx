import * as React from 'react';

export default class extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        console.log('this.props', this.props);
        this.props.getLazy();
    }

    public render() {
        return <div>Lazy component</div>;
    }
}
