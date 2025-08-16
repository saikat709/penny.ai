package com.penny.gemini;

import com.penny.repositories.ExpenseRepository;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

@Component
public class ExpenseTools {

    private ExpenseRepository expenseRepository;

    public ExpenseTools(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    @Tool("This tool is used whenever user uses the 'expense'  keyword. THis is a test tool")
    public boolean testTool(){
        System.out.println("++++++++++++++++++++++++++");
        System.out.println("Test tool is used.");
        System.out.println("+++++++++++++++++++++++++++");
        return true;
    }

    @Tool("This tool is used for saving user expense to database. e.g: expended 10 tk on cloths, wasted 20 on food, and more")
    public boolean saveExpenseToDatabase(
            @P("The category of the expense the user made.") String category,
            @P("Amount of expense user made. Maybe in Taka") Float amount
    ){
        System.out.println("Tool: " + category + ", and amount: " + amount);
//        Expense ex = new Expense();
//        ex.setAmount(BigDecimal.valueOf(amount));
//        // ex.setCategory(category);
//        expenseRepository.save(ex);
        return false;
    }

    @Tool("Add two integers together")
    public int add(@P("The first integer") int a,
                   @P("The second integer") int b) {
        System.out.println("++++++\n+++++");
        return a + b;
    }

    @Tool("Multiply two integers together")
    public int multiply(@P("The first integer") int a,
                        @P("The second integer") int b) {
        return a * b;
    }
}
