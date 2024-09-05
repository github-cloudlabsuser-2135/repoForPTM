const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log("Simple CLI Calculator");
    console.log("Available operations: +, -, *, /");
    
    try {
        const num1 = parseFloat(await askQuestion("Enter the first number: "));
        const operator = await askQuestion("Enter the operator (+, -, *, /): ");
        const num2 = parseFloat(await askQuestion("Enter the second number: "));

        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    console.log("Error: Division by zero is not allowed.");
                    rl.close();
                    return;
                }
                result = num1 / num2;
                break;
            default:
                console.log("Error: Invalid operator.");
                rl.close();
                return;
        }

        console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);
    } catch (error) {
        console.log("Error: Invalid input.");
    } finally {
        rl.close();
    }
}

main();

// test.js
const { expect } = require('chai');
const sinon = require('sinon');
const readline = require('readline');
const { main } = require('./path/to/your/script'); // Adjust the path accordingly

describe('Simple CLI Calculator', function() {
    let rlStub;

    beforeEach(function() {
        rlStub = sinon.stub(readline, 'createInterface').returns({
            question: sinon.stub(),
            close: sinon.stub()
        });
    });

    afterEach(function() {
        sinon.restore();
    });

    it('should add two numbers correctly', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '5');
        rlStub().question.onCall(1).callsArgWith(1, '+');
        rlStub().question.onCall(2).callsArgWith(1, '3');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Result: 5 + 3 = 8')).to.be.true;
    });

    it('should subtract two numbers correctly', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '10');
        rlStub().question.onCall(1).callsArgWith(1, '-');
        rlStub().question.onCall(2).callsArgWith(1, '4');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Result: 10 - 4 = 6')).to.be.true;
    });

    it('should multiply two numbers correctly', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '7');
        rlStub().question.onCall(1).callsArgWith(1, '*');
        rlStub().question.onCall(2).callsArgWith(1, '6');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Result: 7 * 6 = 42')).to.be.true;
    });

    it('should divide two numbers correctly', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '8');
        rlStub().question.onCall(1).callsArgWith(1, '/');
        rlStub().question.onCall(2).callsArgWith(1, '2');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Result: 8 / 2 = 4')).to.be.true;
    });

    it('should handle division by zero', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '8');
        rlStub().question.onCall(1).callsArgWith(1, '/');
        rlStub().question.onCall(2).callsArgWith(1, '0');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Error: Division by zero is not allowed.')).to.be.true;
    });

    it('should handle invalid operator', async function() {
        rlStub().question.onCall(0).callsArgWith(1, '8');
        rlStub().question.onCall(1).callsArgWith(1, '%');
        rlStub().question.onCall(2).callsArgWith(1, '2');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Error: Invalid operator.')).to.be.true;
    });

    it('should handle invalid number input', async function() {
        rlStub().question.onCall(0).callsArgWith(1, 'abc');
        rlStub().question.onCall(1).callsArgWith(1, '+');
        rlStub().question.onCall(2).callsArgWith(1, '2');

        const consoleSpy = sinon.spy(console, 'log');
        await main();

        expect(consoleSpy.calledWith('Error: Invalid input.')).to.be.true;
    });
});