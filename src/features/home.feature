@home
Feature: Create board

    Background:
        Given user at the home page 

    @createBoard
    Scenario: Create a new board
        When user click on Create button enter board tille "My New Board"
        And user click create button
        Then user should see the new board "My New Board" in the list of boards

    
    Scenario: Create a new board from template
        When user click on Create button and chooses Kanban Template
        And user click create button
        Then user should see the new board from template in the list of boards

    @deleteBoard
    Scenario: delete boards closed
        When user click View all boards closed and delete
        Then user should see the boards deleted successfully

    @reopenBoard
    Scenario: Reopen boards closed
        When user click View all boards closed and reopen
        Then user should see the boards reopened successfully