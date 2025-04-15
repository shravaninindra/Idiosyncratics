import openai, os

openai.api_key = os.getenv('CHATGPT_API_KEY')


def get_suggested_message(skills, job_title, company, name):
        messages = [
        {"role": "system", "content": "You are a helpful assistant."} ]
        message = f"Help me write a message to a recruiter at {company} hiring for {job_title}. I have the following skills: {skills} and my name is {name}."
        print(message)
        messages.append(
                {"role": "user", "content": message},
        )
        chat_completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
        )
        answer = chat_completion.choices[0].message.content
        return answer