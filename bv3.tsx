import { useState } from "react"
import {View, Text, TextInput, Button} from 'react-native'
const bv3 = () => {
    const [c, setC] = useState('')
    const [b, setB] = useState('')
    const [floors,setFloors] = useState<string[]>([])
    const [result, setResults] = useState<number>()
    const calculateElevator = () => {
        debugger
      let seconds = 0;
      const limits = Number(c);
      const floorCount = Number(b);
      for (let i = 0; i <= floorCount; i++) {
        seconds++;
        const floorValue = Number(floors[i]);
        if (floorValue !== 0) {
          if (floorValue >= limits) {
            seconds += limits;
          } else {
            seconds += floorCount;
          }
        }
      }
      for (let i = floorCount; i >= 0; i--) {
        seconds++;
        if ((i === 0)) break;
      }
      setResults(seconds);
    };
    const handleFloorChange = (val: string, index: number) => {
      let newFloor = [...floors];
      newFloor[index] = val;
      setFloors(newFloor);
    }
    return (
      <View>
        <TextInput onChangeText={setC} />
        <TextInput
          onChangeText={(val) => {
            setB(val);
            setFloors(new Array(Number(val) + 1).fill(""));
          }}
        />

        {floors.map((i:any) => (
          <TextInput
            onChangeText={(val) => handleFloorChange(val, i)}
          />
        ))}
        <Button title="" onPress={calculateElevator} />
        <Text>{result}</Text>
      </View>
    );
}

export default bv3