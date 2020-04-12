
var questions = [
				{ 
					question: "Presentations made by our Company Board member at external conferences",
					correct: 1
				},
				{ 
					question: "Meaningful Presentation received from external conferences attended by Company staff this year",
					correct: 2
				},
				{ 
					question: "Presentation Material received from external conferences attended by Company staff ten year ago",
					correct: 3
				},
				{ 
					question: "The current Thailand Organization chart in Company SharePoint",
					correct: 2
				},
				{ 
					question: "Call-out tree from every department shared on intranet website",
					correct: 2
				},
				{ 
					question: "Excel file with contain staffing data that can extracted from JDE which will be used to create report",
					correct: 2
				},
				{ 
					question: "The final DRB Decision Support package stored in SharePoint",
					correct: 1
				},
				{ 
					question: "Pre-read Phase 2 DRB package for alternatives selection meeting sent as attachment",
					correct: 2
				},
				{ 
					question: "Email with Draft DRB Decision Support Package attached of the project from last year",
					correct: 3
				},
				{ 
					question: "Thailand vacation carry over policy",
					correct: 1
				},
				{ 
					question: "Policy guideline presentation downloaded from corporate website which will be used for presentation",
					correct: 2
				},
				{ 
					question: "The old SOP for Backup and Recovery",
					correct: 3
				},
				{ 
					question: "The final Audit report from auditor",
					correct: 1
				},
				{ 
					question: "The e-mail of Audit finding suggestion from auditor",
					correct: 2
				},
				{ 
					question: "Email invitation from auditor 3 year ago",
					correct: 3
				},
				{ 
					question: "2017 IT monthly scorecard report in SharePoint",
					correct: 1
				},
				{ 
					question: "OE Minute of meeting during Q1-Q4 2017 downloaded for sharing in my meeting",
					correct: 2
				},
				{ 
					question: "Monthly Expense Report as of 1 July 2000",
					correct: 3
				},
				{ 
					question: "Annual Business Plan presentation which is endorsed by CEO",
					correct: 1
				},
				{ 
					question: "Macro excel that build the graph for Business Plan presentation",
					correct: 2
				},
				{ 
					question: "Draft Annual Business plan presentation while the final one was published",
					correct: 3
				},
				{ 
					question: "2017 PMP performance evaluation in ePMP system",
					correct: 1
				},
				{ 
					question: "2014-2016 PMP performance report in personal folder",
					correct: 2
				},
				{ 
					question: "The PMP feedback from peer/colleague ten year ago",
					correct: 3
				},
				{ 
					question: "Employee Checkup Medical Record notebook",
					correct: 1
				},
				{ 
					question: "Scanned of Employee Medical Checkup result report for Medical treatment",
					correct: 2
				},
				{ 
					question: "Email from hospital to confirm the check-up datetime last year",
					correct: 3
				},
				{ 
					question: "Final Contract in Ariba",
					correct: 1
				},
				{ 
					question: "Copy of Vendor Contract from Ariba and this contract still ACTIVE",
					correct: 2
				},
				{ 
					question: "Draft version of Vendor Contract in email which is not used anymore",
					correct: 3
				},
				{ 
					question: "Last year’s invitation email to a holiday Party",
					correct: 3
				},
				{ 
					question: "Vacation approval notification e-mail from leave online system",
					correct: 3
				},
				
			]
			
			
			function RandomMultipleNumbers(max, randomAmount){
				var result = [];
				for(var i=0; i<randomAmount; i++){
					var rand;
					do{
						rand = Math.floor(Math.random() * max);
					}while(result.indexOf(rand) >= 0);
					result.push(rand);
				}
				return result;
			}
			
			//Call this function to get questions
			function RandomlyGetQuestions(questionAmount){
				var totalNumberOfQuestion = questions.length;
				var selectedQuestions = [];
				
				if(questionAmount > totalNumberOfQuestion){
					return questions;
				}
				
				var questionNumbers = RandomMultipleNumbers(totalNumberOfQuestion, questionAmount);
				questionNumbers.forEach(function(n){
					selectedQuestions.push(questions[n]);
				});
				return selectedQuestions;
			}
			
			function clicked(){
				console.log(RandomlyGetQuestions(5));
			}
			
			//Call this function to check answer
			function IsCorrect(question, answer){
				return question.correct == answer;
			}
