import { MatchResult } from './MatchResult';
import { Summary } from './Summary';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reports/ConsoleReport';
import { HtmlReport } from './reports/HtmlReport';

//первый вариант реалзации - через наследование
// import { CsvFileReader } from './inheritance/CsvFileReader';
// import { MatchReader } from './inheritance/MatchReader';
//
//
//
// const matches = new MatchReader('football.csv');
// matches.read();
//
// let manUnitedWins = 0;
//
// for (let match of matches.data) {
//   if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
//     manUnitedWins++;
//   } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
//     manUnitedWins++;
//   }
// }
//
// console.log(manUnitedWins);

//второй вариант - с помощью интерфейсов
import { MatchReader } from './MatchReader';
import { CsvFileReader } from './CsvFileReader';

const fileData = new CsvFileReader('football.csv');
const matches = new MatchReader(fileData);
matches.load();

// const wins = new Summary(new WinsAnalysis('Man United'), new ConsoleReport()).buildAndPrintReport(matches.data);
const wins = new Summary(new WinsAnalysis('Man United'), new HtmlReport()).buildAndPrintReport(matches.data);
