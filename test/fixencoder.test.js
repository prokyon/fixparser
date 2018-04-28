import FIXParser from './../src/FIXParser';
import Field, {
    MsgType,
    MsgSeqNum,
    SenderCompID,
    SendingTime,
    TargetCompID,
    RawDataLength,
    RawData,
    EncryptMethod,
    HeartBtInt
} from '../src/fields/Field';

describe('FIXEncoder', () => {
    describe('#encode: Heartbeat', () => {
        const fixString = '8=FIX.4.2|9=51|35=0|34=703|49=ABC|52=20100130-10:53:40.830|56=XYZ|10=249|';
        const fixParser = new FIXParser();

        it('should have encoded the FIX message', () => {
            const message = fixParser.createMessage(
                new Field(MsgType, 0),
                new Field(MsgSeqNum, fixParser.setNextTargetMsgSeqNum(703)),
                new Field(SenderCompID, 'ABC'),
                new Field(SendingTime, fixParser.getTimestamp(new Date(Date.UTC(2010, 0, 30, 10, 53, 40, 830)))),
                new Field(TargetCompID, 'XYZ'),
            );
            expect(message.encode().replace(/\x01/g, '|')).toEqual(fixString);
        });
    });
    describe('#encode: Logon', () => {
        const fixString = '8=FIX.4.2|9=76|35=A|34=702|49=ABC|52=20100130-10:52:40.663|56=XYZ|95=4|96=1234|98=0|108=60|10=134|';
        const fixParser = new FIXParser();

        it('should have encoded the FIX message', () => {
            const message = fixParser.createMessage(
                new Field(MsgType, 'A'),
                new Field(MsgSeqNum, fixParser.setNextTargetMsgSeqNum(702)),
                new Field(SenderCompID, 'ABC'),
                new Field(SendingTime, fixParser.getTimestamp(new Date(Date.UTC(2010, 0, 30, 10, 52, 40, 663)))),
                new Field(TargetCompID, 'XYZ'),
                new Field(RawDataLength, 4),
                new Field(RawData, 1234),
                new Field(EncryptMethod, 0),
                new Field(HeartBtInt, 60),
            );
            expect(message.encode().replace(/\x01/g, '|')).toEqual(fixString);
        });
    });
});
