import { Text, StyleSheet } from 'react-native';

type FloorTextProps = {
    floor: string;
}
const FloorText: React.FC<FloorTextProps> = ({floor}) => {
    return (
        <Text style={styles.floorText}>
            {floor}
        </Text>
    );
}

const styles = StyleSheet.create({
    floorText: {
        fontSize: 30,
        fontFamily: 'TTCommonsMedium',
        color: 'white',
        position: 'absolute',
        top: "8%",
        left: "4%",
        textTransform: 'uppercase',
        zIndex:2
    },
});

export default FloorText;